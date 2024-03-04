import { useMemo } from "react"

// porp-types is a library for typechecking of props
import PropTypes from "prop-types"

// react-chartjs-2 components
import { PolarArea } from "react-chartjs-2"

// @mui material components
import Card from "@mui/material/Card"

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox"
import SuiTypography from "components/SuiTypography"

// PolarChart configurations
import configs from "examples/Charts/PolarChart/configs"

function PolarChart({ title, description, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {})

  const renderChart = (
    <SuiBox p={2}>
      {title || description ? (
        <SuiBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SuiBox mb={1}>
              <SuiTypography variant="h6">{title}</SuiTypography>
            </SuiBox>
          )}
          <SuiBox mb={2}>
            <SuiTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      ) : null}
      {useMemo(
        () => (
          <SuiBox p={4}>
            <PolarArea data={data} options={options} />
          </SuiBox>
        ),
        [chart]
      )}
    </SuiBox>
  )

  return title || description ? <Card>{renderChart}</Card> : renderChart
}

// Setting default values for the props of PolarChart
PolarChart.defaultProps = {
  title: "",
  description: "",
}

// Typechecking props for the PolarChart
PolarChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
}

export default PolarChart
