"use client";

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	// const logout = async () => {
	// 	setUser(null);
	// 	try {
	// 		await axios.get(`/api/auth/logout`, {
	// 			withCredentials: true,
	// 		});
	// 		localStorage.removeItem("user");
	// 		setTimeout(() => {
	// 			toast.success("Log out successfully!");
	// 			window.location.reload();
	// 		}, 500);
	// 	} catch (error) {
	// 		console.log("error in logout", error);
	// 	}
	// };

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
