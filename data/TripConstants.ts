


 export const categories = [
    {
      title: "Activities",
      btnText: "Add Activities",
      onClick: () => setOpenModal("activity"),
      bgColor: "bg-[#000031]",
      textColor: "text-white",
      btnBgColor: "bg-[#0D6EFD]",
      btnTextColor: "text-white",
    },
    {
      title: "Hotels",
      btnText: "Add Hotels",
      onClick: () => setOpenModal("hotel"),
      bgColor: "bg-[#E7F0FF]",
      textColor: "text-gray-900",
      btnBgColor: "bg-[#0D6EFD]",
      btnTextColor: "text-white",
    },
    {
      title: "Flights",
      btnText: "Add Flights",
      onClick: () => setOpenModal("flight"),
      bgColor: "bg-[#0D6EFD]",
      textColor: "text-white",
      btnBgColor: "bg-white",
      btnTextColor: "text-[#0D6EFD]",
    },
  ];





  export const sampleImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
  ];
function setOpenModal(arg0: string) {
    throw new Error("Function not implemented.");
}

