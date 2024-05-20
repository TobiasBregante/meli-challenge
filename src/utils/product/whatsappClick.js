import Products from "@/models/products/mongoose"

const ManageWhatsappClick = async (data, _id) => {

    await Products.findByIdAndUpdate(_id, {
        "stats.whatsappClicks": data.stats.whatsappClicks + 1
    }).exec()
}

export default ManageWhatsappClick
