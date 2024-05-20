import Products from "@/models/products/mongoose"

const ManagePublic = async (query, _id)=> {
    let update = {}
    let now = new Date
    if (query == "hide") {
        update = {
            "status.isPublic": false,
            "status.isPublicUntil": now
        }
    }
    if (query == "week") {
        update = {
            "status.isPublic": true,
            "status.isPublicUntil": new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
        }
    }
    if (query == "month") {
        update = {
            "status.isPublic": true,
            "status.isPublicUntil": new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        }
    }

    await Products.findByIdAndUpdate(_id, {
        ...update
    }).exec()
}

export default ManagePublic
