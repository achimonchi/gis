var kecamatan = [
    "",
    "Bukit Raya",
    "Lima Puluh",
    "Marpoyan Damai",
    "Payung Sekaki",
    "Pekanbaru Kota",
    "Rumbai",
    "Rumbai Pesisir",
    "Sail",
    "Senapelan",
    "Sukajadi",
    "Tampan",
    "Tenayan Raya"
]

var val = kecamatan
var m = []
var mymap = L.map('mapid').setView([0.5096044106202124, 101.44901561579901], 15);
var marker = L.marker([0, 0])

$(document).ready(async () => {

    await make_chekcbox(kecamatan)

    // console.log(val)
    await make_map(val)
    await get_data_kec()

    await handle_on_click()
    await submit()

    await make_select2()

    await make_search()

})

const make_chekcbox = async (kecamatan) => {
    kecamatan.map((k, i) => {
        if (k !== "") {
            $("#kecamatan").append(`<input type='checkbox' index=${i} class='form-check-input kec' value='${k}' checked disabled />${k} <br/>`)
        }
    })

    await handle_checkboxAll()
    await handle_checkBox()
}

const make_search = async () => {

    $("#search").select2({
        ajax: {
            type: "POST",
            url: `http://localhost:4000/coordinates/`,
            data: kecamatan,
            dataType: "JSON"
        }
    })
}

const make_select2 = () => {
    $("#district").select2({
        placeholder: "Select a state",
        allowClear: true,
        data: kecamatan
    })

    $(".select2").addClass("form-control")
    $(".select2-selection").css({
        border: "0px"
    })

}   

const handle_checkBox = () => {

    $(".kec").on("click", e => {
        if (e.target.checked) {
            val.push(e.target.value)
        }
        else {
            val.splice($.inArray(e.target.value, val), 1)
        }
        get_data_kec()
    })
}

var temp_marker = L.marker();

const add_temp_marker = async (coor) => {
    var greenIcon = await new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    await mymap.removeLayer(temp_marker)
    temp_marker = await L.marker([coor.lat, coor.lng], { icon: greenIcon }).bindPopup("<b>Bengkel Baru ?</b>").addTo(mymap).openPopup()

}

const get_data_kec = () => {
    mymap.removeLayer(marker)
    get_marker()
    return val
}

const handle_checkboxAll = () => {
    $("#kec-all").click(function () {
        if (this.checked) {
            $(".kec").attr("disabled", true)
            val = kecamatan
        }
        else {
            $(".kec").attr("disabled", false)
            val = []
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
        get_data_kec()
    });
}


const make_map = async () => {


    await L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWNoaW1vbmNoaSIsImEiOiJjazVhdnQ0NTcwMHdxM2twZ3V3dnhiY3Y0In0.qb-YpaLh8ArR4WFPIDM4xw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiYWNoaW1vbmNoaSIsImEiOiJjazVhdnQ0NTcwMHdxM2twZ3V3dnhiY3Y0In0.qb-YpaLh8ArR4WFPIDM4xw'
    }).addTo(mymap);
}

const get_marker = async () => {

    const data = await get_data_marker()
    // console.log(data)
    data.map((d, i) => {
        var coordinates = d.geometry.coordinates
        var properties = d.properties
        marker = L.marker([coordinates[1], coordinates[0]]).bindPopup(`<b>${properties.Nama_Toko}</b><br/> <img src='http://localhost:5500/backend/temp_directories/${properties.Foto}' width='100px' /> `).addTo(mymap)
        m.push(marker)
    })

    mymap.setView([data[0].geometry.coordinates[1], data[0].geometry.coordinates[0]])
}

const get_data_marker = async () => {
    // console.log("From get_data_marker")
    // console.log(val)
    if (val.length === 0) {
        m.map((e) => {
            // console.log(e)
            mymap.removeLayer(e)
        })
        return []
    }
    else {

        const kecamatan = {
            data: val
        }

        m.map((e) => {
            // console.log(e)
            mymap.removeLayer(e)
        })

        // console.log(kecamatan)
        const res = await $.ajax({
            type: "POST",
            url: `http://localhost:4000/coordinates/`,
            data: kecamatan
        })
        const data = res.data
        return data
    }
}


const handle_on_click = () => {

    mymap.on("click", async e => {
        const value = e.latlng
        $("#y").val(value.lat)
        $("#x").val(value.lng)
        // console.log(value)
        add_temp_marker(value)
    })
}

const submit = () => {

    $("#btn-submit").on("click", async e => {
        const data = await validation()
        // console.log(data)
        if (data.flag) {
            $("#btn-submit").addClass("btn-outline-primary")
            $("#btn-submit").attr("disabled", true)

            var formData = await new FormData();
            await formData.append("foto", data.foto_files[0]);

            await formData.append("x", data.x);
            await formData.append("y", data.y);
            await formData.append("nama", data.nama)
            await formData.append("alamat", data.alamat)
            await formData.append("kec", data.kec)
            // await console.log(formData)

            await $.ajax({
                type: "POST",
                url: "http://localhost:4000/coordinates/add",
                data: formData,
                processData: false,
                contentType: false,
                success: res => {
                    alert("Tambah Marker Berhasil !")
                }
            })


        }
        else {
            alert("Data Belum Lengkap")
        }

    })
}

const handle_foto = async () => {
    $("#foto").change(() => {
        // console.log()
    })
}

const validation = async () => {
    var x = await $("#x").val()
    var y = await $("#y").val()
    var foto = await $("#foto").val()
    var foto_files = await document.getElementById("foto").files
    var nama = await $("#nama").val()
    var alamat = await $("#alamat").val()
    var kec = await $("#district").val()
    var flag;
    if (!x || !y || !foto || !nama || !alamat || !kec) {
        flag = false
    }
    else {
        flag = true
    }

    const data = {
        x, y, foto_files, nama, alamat, flag, kec
    }

    return data;



}
