import DetailDialog from "../dialog/detail-dialog";

export default function UserDetailsDialog({ user, isOpen, onOpenChange }) {
    if (!user) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail User #${user.id}`}
            description={`Detail user oleh ${user.client}.`}
            fields={[
                { label: "Nama", value: user.name },
                { label: "Role", value: user.role },
                { label: "Email", value: user.email },
            ]}
        />
    );
}
