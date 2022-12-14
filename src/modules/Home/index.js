import * as COMPONENT from "@Components";

export default function Home() {
    return (
        <>
            <COMPONENT.Alert />
            <div className="max-w-5xl mx-auto px-7 mb-24">
                <COMPONENT.Header title="Activity" />
                <COMPONENT.ActivityGroups />
            </div>
        </>
    );
}