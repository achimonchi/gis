var data = []

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

$(document).ready(() => {
    main()
})

const main = async () => {
    await get_data()
    await make_table()
    await make_edit()
    await get_all_data()
    await search_table()
}

const search_table = async () => {
    $("#searchTable").keyup((e) => {
        
        console.log(e.target.value)
    })
}

const get_all_data = async () => {
    $("#marker").html(data.length)
}

const get_data = async () => {
    const d = await $.ajax({
        type: "GET",
        url: `http://localhost:4000/coordinates/`,
    })

    data = await d.data
}

const make_table = async () => {

    data.map((d, i) => {
        var text = `
            <tr id='${i}'>
                <td>${d.properties.Nama_Toko}</td>
                <td>${d.properties.Alamat}</td>
                <td>${d.kec}</td>
                <td>
                    <img src="http://localhost:5500/backend/temp_directories/${d.properties.Foto}" alt="" width="100px">
                </td>
                <td width='100px'>
                    <button type='button' data-toggle="modal" data-target="#exampleModal" class='btn btn-sm btn-update btn-delete'>
                        <i class='fas fa-edit'/>
                    </button>
                    <button class='btn btn-sm btn-danger btn-delete' id='${d._id}'>
                        <i class='fas fa-trash'/>
                    </button>
                </td>
            </tr>
        `

        $("#value").append(text)
    })

    await $(".btn-delete").on("click", (e) => {
        delete_coordinate(e.currentTarget.id)
    })
}

const make_edit = async () => {
    $("tr").on("click", (e) => {
        var id = e.currentTarget.id
        edit_form(id)
    })
}

const edit_form = async (id) => {
    var d = await data[id]
    $("#edit_id").val(d._id)
    $("#edit_x").val(d.geometry.coordinates[0])
    $("#edit_y").val(d.geometry.coordinates[1])
    $("#edit_nama").val(d.properties.Nama_Toko)
    $("#edit_alamat").val(d.properties.Alamat)
    make_select2("edit_district")
    patch_data(d.properties.Foto)
}

const delete_coordinate = async (id) => {
    await $.ajax({
        type: "delete",
        url: "http://localhost:4000/coordinates/delete/" + id,
        success: () => {
            alert("Delete Success !")
            window.location.reload()
        },
        error: (err) => {
            console.log(err)
        }
    })
}


const patch_data = async (foto) => {
    await $("#update").on("click", async () => {
        var x = await $("#edit_x").val()
        var y = await $("#edit_y").val()
        var nama = await $("#edit_nama").val()
        var alamat = await $("#edit_alamat").val()
        var kec = await $("#edit_district").val()
        var id = await $("#edit_id").val()

        console.log(foto)

        await $.ajax({
            type: "PATCH",
            url: "http://localhost:4000/coordinates/update/" + id,
            data: {
                x,
                y,
                nama,
                alamat,
                kec,
                foto
            },
            success: res => {
                alert("Ubah Data Marker Berhasil !")
                window.location.reload()
            }
        })


        // console.log(alamat)
    })

}
