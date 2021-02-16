/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import styled from "@emotion/styled";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import moment from "moment";

const FrequencyContainer = styled.div`
  border-radius: 6px;
  padding: 29px 35px;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const year = 2020;

const GardenFrequencyV = () => {
  const { theme } = useThemeUI();

  let gardenFrequency = [
    { name: moment(`${year}01`, "YYYYMM").format("MMM[/]YY"), posts: 0 },
    { name: moment(`${year}02`, "YYYYMM").format("MMM[/]YY"), posts: 1 },
    { name: moment(`${year}03`, "YYYYMM").format("MMM[/]YY"), posts: 2 },
    { name: moment(`${year}04`, "YYYYMM").format("MMM[/]YY"), posts: 1 },
    { name: moment(`${year}05`, "YYYYMM").format("MMM[/]YY"), posts: 3 },
    { name: moment(`${year}06`, "YYYYMM").format("MMM[/]YY"), posts: 0 },
    { name: moment(`${year}07`, "YYYYMM").format("MMM[/]YY"), posts: 3 },
    { name: moment(`${year}08`, "YYYYMM").format("MMM[/]YY"), posts: 5 },
    { name: moment(`${year}09`, "YYYYMM").format("MMM[/]YY"), posts: 3 },
    { name: moment(`${year}10`, "YYYYMM").format("MMM[/]YY"), posts: 5 },
    { name: moment(`${year}11`, "YYYYMM").format("MMM[/]YY"), posts: 2 },
    { name: moment(`${year}12`, "YYYYMM").format("MMM[/]YY"), posts: 2 },
  ];

  return (
    <FrequencyContainer sx={{ bg: `hover` }}>
      <Flex>
        <h4 sx={{ m: `0` }}>Gardening frequency</h4>
      </Flex>
      <VictoryChart height={250}>
        <VictoryBar
          data={gardenFrequency}
          barRatio={1.2}
          labels={({ datum }) => (datum.posts === 0 ? "" : datum.posts)}
          labelComponent={<VictoryLabel dy={14} />}
          x="name"
          y="posts"
          style={{
            data: {
              fill: "rgb(219, 94, 135)",
            },
            labels: {
              fill: theme.colors.primary,
              fontSize: 12,
            },
          }}
        />
        <VictoryAxis
          tickFormat={(t) => `${t.slice(0, 3)}`}
          style={{
            tickLabels: {
              fill: theme.colors.primary,
              fontSize: 12,
              opacity: 0.5,
            },
            axis: { stroke: theme.colors.hover },
          }}
        />
      </VictoryChart>
    </FrequencyContainer>
  );
};

export default GardenFrequencyV;
