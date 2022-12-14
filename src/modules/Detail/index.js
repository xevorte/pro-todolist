import * as API from "@Utils/Apis";
import * as COMPONENT from "@Components";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "@Bootstraps/bootstrapActions";

export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ activityGroup, setActivityGroup ] = useState({});
    const detailActivityGroupAction = useCallback(async (id) => {
        const res = await API.detailActivityGroup(id);

        if (res?.status === 200) {
            setActivityGroup(res.data);
        } else {
            dispatch(setAlert({ show: true, label: res?.message || res?.status }));
        }
    }, [dispatch]);

    useEffect(() => {
        detailActivityGroupAction(id);
    }, [id, detailActivityGroupAction]);

    return (
        <>
            <COMPONENT.Alert />
            <div className="max-w-5xl mx-auto px-7 mb-24">
                <COMPONENT.Header title={activityGroup?.title} todoitem back edit />
                <COMPONENT.TodoItems />
            </div>
        </>
    );
}