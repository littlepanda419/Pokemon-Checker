

const data = [
  { nameEng: "-", nameChine: "-", increases: "-", decreases: "-" },
  { nameEng: "Bold", nameChine: "大膽", increases: "DEF", decreases: "ATK" },
  {
    nameEng: "Modest",
    nameChine: "內斂",
    increases: "SP.Atk",
    decreases: "ATK",
  },
  { nameEng: "Calm", nameChine: "溫和", increases: "SP.Def", decreases: "ATK" },
  { nameEng: "Timid", nameChine: "膽小", increases: "SPE", decreases: "ATK" },
  {
    nameEng: "Lonely",
    nameChine: "怕寂寞",
    increases: "ATK",
    decreases: "DEF",
  },
  { nameEng: "-", nameChine: "-", increases: "-", decreases: "-" },
  {
    nameEng: "Mild",
    nameChine: "慢吞吞",
    increases: "SP.Atk",
    decreases: "DEF",
  },
  {
    nameEng: "Gentle",
    nameChine: "溫順",
    increases: "SP.Def",
    decreases: "DEF",
  },
  { nameEng: "Hasty", nameChine: "急躁", increases: "SPE", decreases: "DEF" },
  {
    nameEng: "Adamant",
    nameChine: "固執",
    increases: "ATK",
    decreases: "SP.Atk",
  },
  {
    nameEng: "Impish",
    nameChine: "淘氣",
    increases: "DEF",
    decreases: "SP.Atk",
  },
  { nameEng: "-", nameChine: "-", increases: "-", decreases: "-" },
  {
    nameEng: "Careful",
    nameChine: "慎重",
    increases: "SP.Def",
    decreases: "SP.Atk",
  },
  {
    nameEng: "Jolly",
    nameChine: "爽朗",
    increases: "SPE",
    decreases: "SP.Atk",
  },
  {
    nameEng: "Naughty",
    nameChine: "頑皮",
    increases: "ATK",
    decreases: "SP.Def",
  },
  { nameEng: "Lax", nameChine: "樂天", increases: "DEF", decreases: "SP.Def" },
  {
    nameEng: "Rash",
    nameChine: "馬虎",
    increases: "SP.Atk",
    decreases: "SP.Def",
  },
  { nameEng: "-", nameChine: "-", increases: "-", decreases: "-" },
  {
    nameEng: "Naive",
    nameChine: "天真",
    increases: "SPE",
    decreases: "SP.Def",
  },
  { nameEng: "Brave", nameChine: "勇敢", increases: "ATK", decreases: "SPE" },
  { nameEng: "Relaxed", nameChine: "悠閒", increases: "DEF", decreases: "SPE" },
  {
    nameEng: "Quiet",
    nameChine: "冷靜",
    increases: "SP.Atk",
    decreases: "SPE",
  },
  {
    nameEng: "Sassy",
    nameChine: "自大",
    increases: "SP.Def",
    decreases: "SPE",
  },
  { nameEng: "-", nameChine: "-", increases: "-", decreases: "-" },
];
const nonGrowth = [
  { nameEng: "Hardy", nameChine: "勤奮", increases: "—", decreases: "—" },
  { nameEng: "Docile", nameChine: "坦率", increases: "—", decreases: "—" },
  { nameEng: "Bashful", nameChine: "害羞", increases: "—", decreases: "—" },
  { nameEng: "Quirky", nameChine: "浮躁", increases: "—", decreases: "—" },
  { nameEng: "Serious", nameChine: "認真", increases: "—", decreases: "—" },
];
export function ChineseNature() {
  return (
    <>
      <table className="w-full pad:w-2/3 border-collapse text-center mx-auto m-10 text-lg pad:text-xl pc:text-2xl ">
        <thead>
          <tr className="border-2">
            <th className="border-2"></th>
            <th className="border-2">增加攻擊</th>
            <th className="border-2">增加防禦</th>
            <th className="border-2">增加特攻</th>
            <th className="border-2">增加特防</th>
            <th className="border-2">增加速度</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-2">
            <td>減少攻擊</td>
            {data.map((entry, index) => {
              if (index % 5 === 0) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameChine}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>減少防禦</td>
            {data.map((entry, index) => {
              if (index % 5 === 1) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameChine}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>減少特攻</td>
            {data.map((entry, index) => {
              if (index % 5 === 2) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameChine}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>減少特防</td>
            {data.map((entry, index) => {
              if (index % 5 === 3) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameChine}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>減少速度</td>
            {data.map((entry, index) => {
              if (index % 5 === 4) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameChine}
                  </td>
                );
              }
            })}
          </tr>
        </tbody>
      </table>

      <div className="w-full pad:w-2/3 border-collapse text-center mx-auto m-10 text-lg pad:text-xl pc:text-3xl ">
        <div className="flex justify-center text-center">
          與屬性無關的性格：
        </div>
        <div className="flex justify-center text-center">
          勤奮 坦率 害羞 浮躁 認真
        </div>
      </div>
    </>
  );
}
export function EnglishNature() {
  return (
    <>
      <table className="w-full pad:w-2/3 border-collapse text-center mx-auto m-10 text-lg pad:text-xl pc:text-2xl ">
        <thead>
          <tr className="border-2">
            <th className="border-2"></th>
            <th className="border-2">+ATK</th>
            <th className="border-2">+DEF</th>
            <th className="border-2">+SP.Atk</th>
            <th className="border-2">+SP.Def</th>
            <th className="border-2">+SPE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-2">
            <td>-ATK</td>
            {data.map((entry, index) => {
              if (index % 5 === 0) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameEng}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>-DEF</td>
            {data.map((entry, index) => {
              if (index % 5 === 1) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameEng}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>-SP.Atk</td>
            {data.map((entry, index) => {
              if (index % 5 === 2) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameEng}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>-SP.Def</td>
            {data.map((entry, index) => {
              if (index % 5 === 3) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameEng}
                  </td>
                );
              }
            })}
          </tr>
          <tr className="border-2">
            <td>-SPE</td>
            {data.map((entry, index) => {
              if (index % 5 === 4) {
                return (
                  <td key={index} className="border-2">
                    {entry.nameEng}
                  </td>
                );
              }
            })}
          </tr>
        </tbody>
      </table>

      <div className="w-full pad:w-2/3 border-collapse text-center mx-auto m-10 text-lg pad:text-xl pc:text-3xl ">
        <div className="flex justify-center text-center">
          Doesn't effect the Pokémon's stat:
        </div>
        <div className="flex justify-center text-center">
          Bashful, Docile, Hardy, Quirky, Serious
        </div>
      </div>
    </>
  );
}
