import { useState, useEffect } from "react"
// @mui material components
import Card from "@mui/material/Card"

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox"
import SuiTypography from "components/SuiTypography"

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import Footer from "examples/Footer"
import Table from "examples/Tables/Table"

// Data
import authorsTableData from "layouts/tables/data/authorsTableData"
import projectsTableData from "layouts/tables/data/projectsTableData"

// Apollo
import { tests } from "apollo/query"
import { createTest } from "apollo/mutation"
import { useLazyQuery, useQuery, useMutation } from "@apollo/client"
import React from "react"

function Tables() {
  const [testDatas, settextDatas] = useState([])
  function CreateTestSet() {
    let input
    const [createTestActive, { loading, data, error }] = useMutation(createTest)
    if (loading) return <h1>Loading...</h1>
    if (error) console.log(error)
    if (data) {
      console.log(data)
    }
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createTestActive({ variables: { test1: input.value } })
            settextDatas([
              ...testDatas,
              {
                id: Number(testDatas[testDatas.length - 1].id) + 1,
                test1: input.value,
              },
            ])
            input.value = ""
            console.log(testDatas)
          }}
        >
          <input
            ref={(node) => {
              input = node
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    )
  }
  function Butt() {
    const { loading, data, error, refetch } = useQuery(tests, {
      variables: {
        test1: "",
      },
    })
    useEffect(() => {
      if (loading) return <h1>Loading...</h1>
      if (error) console.log(error)
      if (data) {
        if (data.tests.length > 0) {
          settextDatas(data.tests)
        }
      }
    })
    const datashows = testDatas.map((test) => {
      return (
        <div key={test.id}>
          <p>{test.id}</p>
          <p>({test.test1})</p>
        </div>
      )
    })
    return (
      <div>
        <button onClick={() => refetch()} type="button">
          Activate Lasers
        </button>
        <div className="hi">{datashows}</div>
      </div>
    )
  }
  const { columns, rows } = authorsTableData
  const { columns: prCols, rows: prRows } = projectsTableData

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <div>test</div>
            <CreateTestSet />
            <Butt />
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Authors table</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">Projects table</SuiTypography>
          </SuiBox>
          <SuiBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Tables
