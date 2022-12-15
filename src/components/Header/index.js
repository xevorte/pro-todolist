import * as SVG from "@Configs/Svgs";
import * as COMPONENT from "@Components";
import * as API from "@Utils/Apis";
import { setAlert } from "@Bootstraps/bootstrapActions";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Header(props) {
    const { todoitem, back, edit } = props;
    const [ title, setTitle ] = useState("");
    const [ addModal, setAddModal ] = useState(false);
    const [ disabled, setDisabled ] = useState(true);
    const [ formData, setFormData ] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createActivityGroupAction = useCallback(async (data) => {
        const res = await API.createActivityGroup(data);

        if (res?.status === 201) {
            dispatch(setAlert({ show: true, label: "Activity Group berhasil dibuat" }));
        } else {
            dispatch(setAlert({ show: true, label: res?.status }));
        }
    }, [dispatch]);

    const updateActivityGroupAction = useCallback(async (id, data) => {
        const res = await API.updateActivityGroup(id, data);

        if (res.status === 200) {
            setTitle(res.title);
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    useEffect(() => {
        setTitle(props?.title);
    }, [props?.title]);

    return (
        <>
            {todoitem ? (
                <COMPONENT.Modal title="Tambah List Item" todoitem type="create-update" isOpen={addModal} setIsOpen={() => setAddModal(!addModal)} />
            ) : (
                <COMPONENT.Modal title="Tambah Activity" isOpen={addModal} setIsOpen={() => setAddModal(!addModal)} onSubmit={e => {
                    e.preventDefault();
                    createActivityGroupAction(formData);
                }}>
                    <div className="input-groups">
                        <label htmlFor="title" className="text-basic text-sm font-semibold mb-2.5">NAMA ACTIVITY GROUP</label>
                        <input type="text" className="form-control text-basic placeholder:text-[#A4A4A4] placeholder:font-normal border-[#E5E5E5] rounded-lg p-3 shadow-none" placeholder="Tambahkan nama activity group" onChange={event => setFormData(prev => ({...prev, title: event.target.value}))} />
                    </div>
                </COMPONENT.Modal>
            )}
            <div className="flex justify-between align-content-center flex-wrap mt-11 mb-14">
                <div className="flex max-w-full lg:w-[60%] items-center">
                    {back && (
                        <button
                            className="p-0 mb-4 mr-5"
                            onClick={() => navigate(-1)}
                        >
                            <img src={SVG.IC_BACK} alt="icon" />
                        </button>
                    )}
                    {props?.title ? (
                        <input data-cy="todo-title" type="text" className="max-w-[80%] text-4xl text-basic font-bold mb-4 border-b-2 focus:outline-none disabled:bg-white disabled:border-transparent" value={title} disabled={disabled} onChange={event => setTitle(event.target.value)} />
                    ) : (
                        <h1 data-cy="header-title" className="text-4xl text-basic font-bold mb-4">Activities</h1>
                    )}
                    {edit && (
                        <button
                            className="mb-4 p-0"
                            onClick={() => {
                                updateActivityGroupAction(id, { title: title });
                                setDisabled(!disabled);
                            }}
                        >
                            <img src={SVG.IC_EDIT} alt="icon" />
                        </button>
                    )}
                </div>
                {todoitem ? (
                    <button
                        data-cy="todo-add-button"
                        className="flex items-center bg-main text-lg text-white font-semibold py-3.5 pl-6 pr-7 mb-4 rounded-full leading-none"
                        onClick={() => {
                            setAddModal(!addModal);
                        }}
                    >
                        <img src={SVG.IC_PLUS} alt="icon" className="me-2" />
                        Tambah
                    </button>
                ) : (
                    <button
                        data-cy="activity-add-button"
                        className="flex items-center bg-main text-lg text-white font-semibold py-3.5 pl-6 pr-7 mb-4 rounded-full leading-none"
                        onClick={() => {
                            setAddModal(!addModal);
                        }}
                    >
                        <img src={SVG.IC_PLUS} alt="icon" className="me-2" />
                        Tambah
                    </button>
                )}
            </div>
        </>
    );
}