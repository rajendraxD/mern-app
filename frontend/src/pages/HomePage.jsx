import React, { useEffect } from "react";
import { addItemService, deleteItemService, getAllItemsService, getItemByIdService, updateItemService } from "../services/api";

export default function HomePage() {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({ name: "" });

    useEffect(() => {
        let ignore = false;
        getAllItemsService()
            .then((data) => { if (!ignore) setItems(data); })
            .catch(console.error)
            .finally(() => { if (!ignore) setLoading(false); });
        return () => { ignore = true; };
    }, []);

    const handleDelete = async (id) => {
        await deleteItemService(id);
        setItems((prev) => prev.filter((item) => item._id !== id));
    };

    const handleAddItems = async () => {
        try {
            await addItemService({ name: formData.name });
            await getAllItemsService().then((data) => setItems(data));
        } catch (error) {
            console.error(error)
        }
    }
    const handleUpdateItems = async (id, data) => {
        await updateItemService(id, data);
        await getAllItemsService().then((data) => setItems(data));
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleEditItems = async (id) => {
        try {
            // await getAllItemsService().then((data) => setFormData(data));
            await getItemByIdService(id).then((data) => setFormData(data));
        } catch (error) {
            console.error(error)
        }
    }

    if (items.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <section>
                <h1 style={{ color: "red", textAlign: "center" }}>Items</h1>
                <input type="text" placeholder="name" name="name" value={formData.name} onChange={(e) => onChangeHandler(e)} />
                <button disabled={loading} onClick={() => handleAddItems()}>Add</button>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button disabled={loading} onClick={() => handleEditItems(item._id)}>Edit</button>
                                    <button disabled={loading} onClick={() => handleUpdateItems(item._id, { name: formData.name })}>Update</button>
                                    <button disabled={loading} onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
