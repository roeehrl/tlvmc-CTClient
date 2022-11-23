export async function waitAtLeast(milliseconds, promise) {
    const start = new Date();

    let result, error;
    try {
        result = await promise;
    } catch (e) {
        error = e;
    }

    const wait = milliseconds - (new Date() - start);
    if (wait > 0) {
        await new Promise(resolve => setTimeout(() => resolve(), wait));
    }

    if (error) {
        throw error;
    }

    return result;
}

export const getTodaysDate = () => {
    const today = new Date();
    const yy = today.getFullYear().toString().substring("2");
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '.' + mm + '.' + yy;

    return formattedToday;
}