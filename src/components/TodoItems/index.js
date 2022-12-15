import * as COMPONENT from "@Components";
import * as IMG from "@Configs/Imgs";
import * as SVG from "@Configs/Svgs";
import * as API from "@Utils/Apis";
import * as REACTSTRAP from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@Bootstraps/bootstrapActions";
import { useParams } from "react-router-dom";
import clsx from "classnames";

export default function TodoItems(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ todoItems, setTodoItems ] = useState([]);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ todoId, setTodoId ] = useState(0);

    const listTodoItemsAction = useCallback(async (id) => {
        const res = await API.listTodoItems(id);

        if (res?.status === 200) {
            setTodoItems(res?.data.data);
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    const switchTodoItemAction = useCallback(async (id, value) => {
        const data = { is_active: value }
        const res = await API.updateTodoItem(id, data);

        if (res?.status !== 200) {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            listTodoItemsAction(id);
        }
    }, [id, listTodoItemsAction, API.listTodoItems()]);

    return todoItems.length > 0 ? (
        <div className="row m-0">
            <COMPONENT.Modal
                todoitem
                id={todoId}
                label="activity"
                type="delete"
                isOpen={deleteModal}
                setIsOpen={() => setDeleteModal(!deleteModal)}
            />
            <COMPONENT.Modal
                todoitem
                id={todoId}
                title="Edit List Item"
                type="create-update"
                isOpen={editModal}
                setIsOpen={() => setEditModal(!editModal)}
            />
            {todoItems.map(el => (
                <div key={el.id} className="col-12 flex items-center justify-between px-6 py-4 mb-4 border border-slate-50 shadow-xl rounded-xl">
                    <div className="content flex items-center">
                        <REACTSTRAP.Input data-cy="todo-item-checkbox" type="checkbox" defaultChecked={el.is_active !== 1} className="w-[20px] h-[20px]" onClick={() => switchTodoItemAction(el.id, (el.is_active === 1 ? 0 : 1))} />
                        <div className={clsx("block w-[10px] h-[10px] rounded-full mx-4 mt-0.5", {
                            "bg-very-high": el.priority === "very-high",
                            "bg-high": el.priority === "high",
                            "bg-medium": el.priority === "normal",
                            "bg-low": el.priority === "low",
                            "bg-very-low": el.priority === "very-low",
                        })}></div>
                        <p className={clsx("text-basic text-lg font-medium mr-4 mt-0.5 leading-none", {
                            "text-slate-400 line-through": el.is_active !== 1
                        })}>{el.title}</p>
                        <button className="p-0 m-0">
                            <img src={SVG.IC_EDIT} alt="icon" onClick={() => {
                                setTodoId(el.id);
                                setEditModal(!editModal);
                            }} />
                        </button>
                    </div>
                    <button data-cy="todo-item-delete-button" className="p-0 m-0" onClick={() => {
                        setTodoId(el.id);
                        setDeleteModal(!deleteModal);
                    }}>
                        <img src={SVG.IC_DELETE} alt="icon" />
                    </button>
                </div>
            ))}
        </div>
    ) : (
        <img src={IMG.TodoEmptyState} alt="illustration" className="w-[60%] mx-auto" />
    )
}