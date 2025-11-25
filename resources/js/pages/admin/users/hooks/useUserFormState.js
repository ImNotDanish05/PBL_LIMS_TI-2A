import { useEntitySelection } from "./useEntitySelection";

export function useUserFormState() {
    const trainings = useEntitySelection();

    return {
        trainings,
    };
}
