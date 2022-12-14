import * as REACTSTRAP from "reactstrap";
import * as SVG from "@Configs/Svgs";
import * as API from "@Utils/Apis";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@Bootstraps/bootstrapActions";
import { useParams } from "react-router-dom";
import Select from "react-select";
import clsx from "classnames";

const options = [
    { value: "very-high", label: "Very High" },
    { value: "high", label: "High" },
    { value: "normal", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "very-low", label: "Very Low" },
];

export default function Modal(props) {
    const { isOpen, setIsOpen, todoitem, id, type, label, title, children, onSubmit } = props;
    const [ data, setData ] = useState({});
    const params = useParams();
    const dispatch = useDispatch();

    const SelectOption = ({ children }) => (
        <div className="flex items-center form-control border-[#E5E5E5] rounded-lg p-3 shadow-none">
            <div className={clsx("block w-[10px] h-[10px] rounded-full", {
                "bg-very-high": data?.priority === "very-high",
                "bg-high": data?.priority === "high",
                "bg-medium": data?.priority === "normal",
                "bg-low": data?.priority === "low",
                "bg-very-low": data?.priority === "very-low",
            })} />
            {children}
        </div>
    );

    const detailActivityGroupAction = useCallback(async (id) => {
        const res = await API.detailActivityGroup(id);

        setData(res.data);
    }, []);

    const createTodoItemAction = useCallback(async (data) => {
        const res = await API.createTodoItem({
            activity_group_id: params.id,
            ...data
        });

        if (res?.status === 201) {
            dispatch(setAlert({ show: true, label: "Activity berhasil dibuat" }));
        } else {
            dispatch(setAlert({ show: true, label: res?.status }));
        }
    }, [params.id, dispatch]);

    const updateTodoItemAction = useCallback(async (id, data) => {
        const res = await API.updateTodoItem(id, data);

        if (res.status === 200) {
            dispatch(setAlert({ show: true, label: "Activity berhasil diubah" }));
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    const removeActivityGroupAction = useCallback(async (id) => {
        const res = await API.removeActivityGroup(id);

        if (res.status === 200) {
            dispatch(setAlert({ show: true, label: "Activity Group berhasil dihapus" }));
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    const detailTodoItemAction = useCallback(async (id) => {
        const res = await API.detailTodoItem(id);

        setData(res.data);
    }, []);

    const removeTodoItemAction = useCallback(async (id) => {
        const res = await API.removeTodoItem(id);

        if (res.status === 200) {
            dispatch(setAlert({ show: true, label: "Activity berhasil dihapus" }));
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            if (todoitem) {
                detailTodoItemAction(id);
            } else {
                detailActivityGroupAction(id);
            }
        }
    }, [id, todoitem, detailActivityGroupAction, detailTodoItemAction]);

    const closeButton = (
        <button type="button" className="text-second text-3xl font-light leading-none" onClick={setIsOpen}>
            &times;
        </button>
    );

    switch(type) {
        case "delete": return (
            <REACTSTRAP.Modal className="w-[97%] lg:w-[490px] rounded-full border-none" isOpen={isOpen} toggle={setIsOpen} centered>
                <REACTSTRAP.ModalBody className="text-center px-[30px] py-12">
                    <img src={SVG.IC_DANGER} alt="danger" className="mx-auto"/>
                    <p className="text-basic text-xl font-medium mt-12 mb-11 leading-8">
                        Apakah anda yakin menghapus {label} <br/>
                        <span className="font-bold">"{data?.title}"</span>
                    </p>
                    <div className="flex justify-center items-center">
                        <button
                            className="flex items-center bg-slate-200 text-[#4A4A4A] text-lg font-semibold py-3 px-10 rounded-full leading-none"
                            onClick={setIsOpen}
                            >
                                Batal
                        </button>
                        <form action="" onSubmit={e => {
                            e.preventDefault();
                            (todoitem ? removeTodoItemAction(id) : removeActivityGroupAction(id));
                        }}>
                            <button type="submit" className="flex items-center bg-very-high text-lg text-white font-semibold py-3 px-10 ml-5 rounded-full leading-none" onClick={setIsOpen}>
                                Hapus
                            </button>
                        </form>
                    </div>
                </REACTSTRAP.ModalBody>
            </REACTSTRAP.Modal>
        );

        case "create-update": return (
            <REACTSTRAP.Modal className="w-[97%] lg:w-[830px] rounded-2xl border-none" isOpen={isOpen} toggle={setIsOpen} centered>
                <REACTSTRAP.ModalHeader toggle={setIsOpen} close={closeButton} className="text-basic text-lg font-semibold px-[30px] py-4 pb-3">
                    {title}
                </REACTSTRAP.ModalHeader>
                <form action="" onSubmit={e => {
                    e.preventDefault();
                    id ? updateTodoItemAction(id, data) : createTodoItemAction(data);
                }}>
                    <REACTSTRAP.ModalBody className="px-[30px] py-6">
                        <div className="input-groups">
                            <label htmlFor="title" className="text-basic text-sm font-semibold mb-2.5">NAMA LIST ITEM</label>
                            <input type="text" className="form-control text-basic placeholder:text-[#A4A4A4] placeholder:font-normal border-[#E5E5E5] rounded-lg p-3 shadow-none" placeholder="Tambahkan nama activity" value={data?.title} onChange={event => setData(prev => ({...prev, title: event.target.value}))} />
                        </div>
                        {todoitem && (
                            <div className="input-groups my-4">
                                <label htmlFor="title" className="text-basic text-sm font-semibold mb-2.5">PRIORITY</label>
                                <Select
                                    defaultValue={data?.priority}
                                    onChange={event => setData(prev => ({...prev, priority: event.value}))}
                                    options={options}
                                    placeholder={"Select Priority"}
                                    components={{ Control: SelectOption }}
                                />
                            </div>
                        )}
                    </REACTSTRAP.ModalBody>
                    <REACTSTRAP.ModalFooter className="px-10 py-3">
                        <button type="submit" className="flex items-center bg-main text-lg text-white font-semibold py-3 px-10 rounded-full leading-none" onClick={setIsOpen}>
                            Simpan
                        </button>
                    </REACTSTRAP.ModalFooter>
                </form>
            </REACTSTRAP.Modal>
        )
        
        default: return (
            <REACTSTRAP.Modal className="w-[97%] lg:w-[830px] rounded-2xl border-none" isOpen={isOpen} toggle={setIsOpen} centered>
                <REACTSTRAP.ModalHeader toggle={setIsOpen} close={closeButton} className="text-basic text-lg font-semibold px-[30px] py-4 pb-3">
                    {title}
                </REACTSTRAP.ModalHeader>
                <form action="" onSubmit={onSubmit}>
                    <REACTSTRAP.ModalBody className="px-[30px] py-6">
                        {children}
                    </REACTSTRAP.ModalBody>
                    <REACTSTRAP.ModalFooter className="px-10 py-3">
                        <button type="submit" className="flex items-center bg-main text-lg text-white font-semibold py-3 px-10 rounded-full leading-none" onClick={setIsOpen}>
                            Simpan
                        </button>
                    </REACTSTRAP.ModalFooter>
                </form>
            </REACTSTRAP.Modal>
        );
    }
}