import React from 'react'

export default function Dashboard(props) {

  return (
    <>
      <table className="table">
            <tbody>
                <tr>
                <th scope="row">Engine Capacity:</th>
                <td>{ props.add }</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}
