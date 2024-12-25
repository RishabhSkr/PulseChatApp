import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import {dashboardData} from '../../constants/sampleData'
import {transformImage}  from  "../../lib/features"
import AvatarCard from '../../components/shared/AvatarCard'

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    // yeh important h yhan kaise avatar each row me show hoga user ka
    renderCell: (params) => (
      <AvatarCard src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserMangament = () => {
  const [rows, seRows] = useState([])

  useEffect(() => {
    const data = dashboardData.users.map((user) => ({
      id: user._id,
      avatar: transformImage(user.avatar,50),
      name: user.name,
      username: user.username,
      friends: user.friends,
      groups: user.groups,
    }))
    seRows(data)
  }, [])

  return (
    <AdminLayout>

      <Table heading={"All Users"} cols={columns} rows={rows} />
    </AdminLayout>
  )
}

export default UserMangament