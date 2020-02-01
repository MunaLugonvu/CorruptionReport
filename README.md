# CorruptionApIProject

#Setup 
<h3> Running The app locally</h3>
This is for when one would like to run the app on their local machine
1. Clone the repository<br>
2. Install MongoDB,and connect the database.<br>
3.Run npm dev Start to start the server.<br>
4.Use the routes.rest file to make calls to the database<br>



<H2>Endpoints</H2><br>
<table>
    <tr>
        <th> Path </th>
        <th>Endpoint</th>
        <th> Action</th>
    </tr>
    <tr>
       <td>/interventions</td>
       <td> GET</td>
       <td> Gets a list of all interventions</td>
    </tr>
    <tr>
        <td>/interventions</td>
        <td> POST</td>
        <td> Creates a new intervention</td>
     </tr>
     <tr>
        <td>/interventions/id</td>
        <td> GET</td>
        <td> Gets a specific intervention</td>
     </tr>
     <tr>
        <td>/interventions/id</td>
        <td> PATCH</td>
        <td> Updates a given intervention</td>
     </tr>
     <tr>
        <td>/auth/signup</td>
        <td> POST </td>
        <td>Creates a new user</td>
     </tr>
     <tr>
        <td>/auth/signin</td>
        <td> POST</td>
        <td> Logs in a user</td>
     </tr>
</table>

