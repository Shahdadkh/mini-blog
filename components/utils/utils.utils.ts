export const exportDate = (date: any) => {
  if (date !== "") {
    const d = new Date(date);
    const dd = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    return dd;
  }
};

export const exportDateAndTime = (date: any) => {
  if (date !== "") {
    const d = new Date(date);
    const dd = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    const time = new Intl.DateTimeFormat("fa-IR", {
      timeStyle: "short",
    }).format(d);
    return `${time} - ${dd}`;
  }
};
