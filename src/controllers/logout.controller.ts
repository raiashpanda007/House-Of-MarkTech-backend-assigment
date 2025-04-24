import { asyncHandler, Response } from "../utils";

const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        path: "/", 
    });

    return res
        .status(200)
        .json(new Response(200, "Logout successful", null));
});

export default logout;
