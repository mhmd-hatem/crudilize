export function ErrorElement({ status, error }: Readonly<{ error: string | null, status: number }>) {


    const Error500 = <>
        <p>Something wrong happened</p>
        <p>{error}</p>
    </>

    const Error404 =
        <p>No spells found</p>

    const Error409 = <p>A spell with the same name already exists</p>


    switch (status) {

        case 500:
            return Error500
        case 404:
            return Error404
        case 409:
            return Error409
        default:
            return null
    }
}