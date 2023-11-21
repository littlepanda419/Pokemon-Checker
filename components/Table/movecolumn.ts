export default function useColumns() {
  const columns = [
    {
      header: "等級",
      accessorKey: "level",
    },
    {
      header: "招式名稱",
      accessorKey: "name",
    },
    {
      header: "屬性",
      accessorKey: "type",
    },
    {
      header: "類別",
      accessorKey: "class",
    },
    {
      header: "威力",
      accessorKey: "power",
    },
    {
      header: "命中",
      accessorKey: "accur",
    },
    {
      header: "PP",
      accessorKey: "pp",
    },
  ];

  return columns;
}
