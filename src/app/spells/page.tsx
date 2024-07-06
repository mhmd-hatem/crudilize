import { redirect } from 'next/navigation';

export default async function Spells() {
    return (
        redirect("/spells/0")
    );
}
