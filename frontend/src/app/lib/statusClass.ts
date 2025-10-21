  function statusClass(status: string) {
    switch (status) {
      case "watching":
        return "bg-yellow-100 text-yellow-800";
      case "watched":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  }

  export { statusClass };