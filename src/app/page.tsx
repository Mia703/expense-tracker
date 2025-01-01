import { Button, Paper, TextField } from "@mui/material";

export default function Home() {
  return (
    <section id="login" className="col-span-4 md:col-span-6 lg:col-span-12 flex flex-col justify-center items-center h-[90vh]">
      <div id="login-wrapper" className="w-[65vw]">
        <h1 className="mb-4 text-center">Expense Tracker</h1>
        <Paper elevation={3} className="p-4">
          <h2 className="mb-8">Login</h2>
          <form action="" method="post" className="flex flex-col justify-between">
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              required
              className="my-4"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              required
              className="my-4"
            />
            <Button type="submit" variant="contained" className="my-4 bg-primaryBlack">
              Login
            </Button>
          </form>
          <div className="signup-wrapper flex flex-row items-center justify-center">
            <p>Don&apos;t have an account?</p>
            <a href="" className="mx-2 font-bold">
              Sign Up
            </a>
          </div>
        </Paper>
      </div>
    </section>
  );
}
