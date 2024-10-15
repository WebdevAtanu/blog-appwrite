import { useForm } from "react-hook-form";

export default function Loginform() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td><input {...register("firstName")} /></td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>
            <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          </td>
        </tr>
      </tbody>
    </table>
      
      
      <input type="submit" />
    </form>
  );
}