export const filterItem = (array, nameItem, atribute) => {
    const myItem = array.find(
        (itemElement) => itemElement[atribute] == nameItem
    );
    return myItem;
};