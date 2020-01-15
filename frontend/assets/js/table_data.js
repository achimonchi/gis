var data = []

$(document).ready(() => {
    main()
})

const main = async () => {
    await get_data()
    await make_table()
    await make_edit()
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
                    <button class='btn btn-sm btn-danger btn-delete'>
                        <i class='fas fa-trash'/>
                    </button>
                </td>
            </tr>
        `

        $("#value").append(text)
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
    $("#edit_x").val(d.geometry.coordinates[0])
    $("#edit_y").val(d.geometry.coordinates[1])
    $("#edit_nama").val(d.properties.Nama_Toko)
    $("#edit_alamat").val(d.properties.Alamat)
    make_select2("edit_district")
    $("#edit_imgPreview").attr("src", `http://localhost:5500/backend/temp_directories/${d.properties.Foto}`)

    patch_data()
}


const patch_data = async () => {
    $("#update").on("click", () => {
        var x = $("#edit_x").val()
        var y = $("#edit_y").val()
        var nama = $("#edit_nama").val()
        var alamat = $("#edit_alamat").val()
        var foto = $("#edit_foto").val()

        if (foto) {
            console.log("ADa Foto")
        }
        else {
            console.log("Tidak Ada Foto")
        }


        console.log(alamat)
    })

}

