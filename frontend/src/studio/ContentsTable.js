import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import { visuallyHidden } from "@mui/utils"
import person from "assets/images/person.png"
import { Button } from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined"
import PublicIcon from "@mui/icons-material/Public"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"
import { formatDate } from "functions/formatDate"
import { DELETE_VIDEO } from "apollo/mutation"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { UPDATE_ISPUBLIC } from "apollo/mutation"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: "title", isPublic: false, disablePadding: true, label: "동영상" },
  { id: "open", isPublic: false, disablePadding: false, label: "공개 상태" },
  { id: "date", isPublic: true, disablePadding: false, label: "날짜" },
  { id: "views", isPublic: true, disablePadding: false, label: "조회수" },
  { id: "comments", isPublic: true, disablePadding: false, label: "댓글" },
  { id: "likes", isPublic: true, disablePadding: false, label: "좋아요" },
]

function ContentsTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.isPublic ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{
                maxHeight: "15px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

ContentsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

function ContentsTableToolbar(props) {
  const { numSelected, onDelete } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <></>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <CustomIconMenu
              iconButton={<FilterListIcon />}
              menuItems={[
                { text: "test", onclick: () => {} },
                { text: "test2", onclick: () => {} },
              ]}
            />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

ContentsTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
}
export default function ContentsTable() {
  // 영상 모두 가져오기
  const { loading, error, data, refetch } = useQuery(GET_ALL_VIDEOS)

  // 영상 제거
  const [deleteVideo] = useMutation(DELETE_VIDEO)

  // 공개/비공개 변경
  const [changeIsPublic] = useMutation(UPDATE_ISPUBLIC)

  const [rows, setRows] = useState([])

  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("calories")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [selected, setSelected] = useState([])
  const [visibleRows, setVisibleRows] = useState(null)

  useEffect(() => {
    refetch()
    console.log(data)
    if (data) {
      const updatedRows = data.youtubeMedias

      setRows(updatedRows)
    }
  }, [loading, error, data, refetch])

  useEffect(() => {
    const arr = stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
    setVisibleRows(arr)
  }, [rows, order, orderBy, page, rowsPerPage])

  const handleRequestSort = (event, property) => {
    console.log(property)
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // 페이지를 첫 번째 페이지로 다시 설정
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  React.useEffect(() => {
    console.log("삭제")

    // const arr = stableSort(rows, getComparator(order, orderBy)).slice(
    //   page * rowsPerPage,
    //   page * rowsPerPage + rowsPerPage
    // )
    // setVisibleRows(arr)
    // console.log(arr)
  }, [order, orderBy, page, rowsPerPage, data, refetch, deleteVideo])

  const deleteHandler = () => {
    selected.forEach((select) => {
      deleteVideo({
        variables: { id: select },
        onCompleted: () => {
          console.log(`비디오 ${select} 삭제 완료`)
          refetch()
        },
        onError: (err) => {
          console.error(err)
        },
      })
    })
    setSelected([])
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ContentsTableToolbar numSelected={selected.length} onDelete={deleteHandler} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
            <ContentsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />

            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row?.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row?.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {/* 썸네일 */}
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          width={"150px"}
                          height={"100px"}
                          src={process.env.REACT_APP_BACKEND_URL_UPLOAD + row?.thumbnail.url}
                          style={{
                            border: "1px solid black",
                            marginRight: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <div>{row?.name}</div>
                      </div>
                    </TableCell>
                    {/* 공개 여부 */}
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      {row.isPublic === true ? <PublicIcon /> : <HttpsOutlinedIcon />}
                      {row.isPublic}
                      <Button
                        onClick={(e) => {}}
                        style={{ padding: 0, minWidth: 0, borderRadius: "25px" }}
                      >
                        <CustomIconMenu
                          iconButton={<ArrowDropDownIcon />}
                          menuItems={[
                            {
                              text: "공개",
                              onClick: (e) => {
                                console.log("공개")
                                if (row.isPublic == true) return
                                changeIsPublic({
                                  variables: { id: row.id, isPublic: true },
                                  onCompleted: () => {
                                    refetch()
                                  },
                                })
                              },
                            },
                            {
                              text: "비공개",
                              onClick: () => {
                                console.log("비공개")
                                if (row.isPublic == false) return
                                changeIsPublic({
                                  variables: { id: row.id, isPublic: false },
                                  onCompleted: () => {
                                    refetch()
                                  },
                                })
                              },
                            },
                          ]}
                        />
                      </Button>
                    </TableCell>
                    {/* 만든 일자 */}
                    <TableCell align="right" style={{ minWidth: "200px" }}>
                      {formatDate(row.created_at)}
                    </TableCell>
                    <TableCell align="right">{row.views}</TableCell>
                    {/* 댓글 수 */}
                    <TableCell align="right">{row.comment}</TableCell>
                    {/* 좋아요 수 */}
                    <TableCell align="right">{row.like_users.length}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
