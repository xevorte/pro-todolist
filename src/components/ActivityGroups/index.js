import * as API from "@Utils/Apis";
import * as SVG from "@Configs/Svgs";
import * as COMPONENT from "@Components";
import { ActivityEmptyState } from "@Configs/Imgs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@Bootstraps/bootstrapActions";
import date from "date-and-time";

export default function ActivityGroups() {
    const [ activityGroups, setActivityGroups ] = useState([]);
    const [ isFetching, setIsFetching ] = useState(true);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ id, setId ] = useState(0);
    const dispatch = useDispatch();

    const listActivityGroupsAction = useCallback(async () => {
        const res = await API.listActivityGroups();

        if (res.status === 200) {
            setActivityGroups(res.data.data);
            setIsFetching(false);
        } else {
            dispatch(setAlert({ show: true, label: res.status }));
        }
    }, [dispatch]);

    useEffect(() => {
        listActivityGroupsAction();
    }, [listActivityGroupsAction, API.listActivityGroups()]);

    return isFetching ? (
        <div className="row -ml-2.5">
            {[...Array(4)].map((el, id) => (
                <div key={id} className="placeholder-glow col-lg-3 py-2">
                    <div className="min-h-[234px] flex flex-column justify-between border border-neutral-50 rounded-xl shadow-xl px-7 py-[24px]">
                        <h1 className="placeholder rounded-lg text-lg font-bold">New Activity Group</h1>
                        <div className="flex justify-between items-center">
                            <p className="placeholder rounded-lg text-sm text-second font-medium leading-none">1 Januari 2022</p>
                            <button className="m-0 p-0" onClick={() => {setDeleteModal(!deleteModal)}}>
                                <img src={SVG.IC_DELETE} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : activityGroups.length > 0 ? (
        <div className="row -ml-2.5">
            <COMPONENT.Modal id={id} label="activity" type="delete" isOpen={deleteModal} setIsOpen={() => setDeleteModal(!deleteModal)} />
            {activityGroups.map(activityList => (
                <div data-cy="activity-item" key={activityList.id} className="col-lg-3 pb-4">
                    <div className="min-h-[234px] flex flex-column justify-between border border-neutral-50 rounded-xl shadow-xl px-7 py-[24px]">
                        <a data-cy="activity-item" href={`/detail/${activityList.id}`} className="text-basic hover:text-basic">
                            <div data-cy="activity-title" className="text-lg font-bold">{activityList.title}</div>
                        </a>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-second font-medium leading-none">{date.format(new Date(activityList.created_at), "D MMMM YYYY")}</p>
                            <button className="m-0 p-0" onClick={() => {
                                setId(activityList.id);
                                setDeleteModal(!deleteModal);
                            }}>
                                <img src={SVG.IC_DELETE} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <img
            data-cy="activity-empty-state"
            src={ActivityEmptyState}
            alt="illustration"
            className="w-[60%] mx-auto mt-24"
        />
    );
}