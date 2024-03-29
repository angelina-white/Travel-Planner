export const increment = () =>
{
    return (
        {
            type: "INCREMENT"
        }
    )
}

export const vacation = () =>
{
    return (
        {
            type: "VACATION"
        }
    )
}

export const goToSettings = () =>
{
    return (
        {
            type: "GOTOSETTINGS"
        }
    )
}

export const updateName = () =>
{
    return (
        {
            type: "UPDATENAME"
        }
    )
}

export const addBook = (book) => {
    return {
      type: "books/add",
      payload: book,
    };
  };
  
  export const removeBook = (id) => {
    return {
      type: "books/remove",
      payload: id,
    };
  };


export const addVaca = (vaca) => {
    return {
      type: "vaca/add",
      payload: vaca,
    };
  };