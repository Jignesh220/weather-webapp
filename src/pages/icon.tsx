import React from "react";
import { Stack } from "@mui/joy";
import Table from "@mui/joy/Table";

export default function icon() {
  const [iconData, seticonData] = React.useState([]);
  React.useEffect(() => {
    if (iconData.length === 0) {
      getIconData();
    }
  }, [iconData]);

  const getIconData = () => {
    fetch("https://www.weatherapi.com/docs/conditions.json")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        seticonData(json);
      });
  };
  return (
    <div>
      {iconData.map((data) => (
        <PresentData
          key={data.code}
          day={data.day}
          night={data.night}
          code={data.code}
          icon={data.icon}
        />
      ))}
    </div>
  );
}

const PresentData = ({ day, night, icon, code }: any) => {
  return (
    <div>
      <Table aria-label="basic table">
        <tbody>
          <tr>
            <td className="font-bold text-2xl"> <span className="text-sm font-bold">code: </span> {code}</td>
            <td className="font-bold text-2xl"><span className="text-sm font-bold">day: </span>{day}</td>
            <td className="font-bold text-2xl"><span className="text-sm font-bold">night: </span>{night}</td>
            <td className="font-bold text-2xl"><span className="text-sm font-bold">icon: </span>{icon}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
