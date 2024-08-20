"use client";

import React, { useState } from "react";
import { ActionButtonProps } from "@/src/types";

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick = () => {}, ariaLabel = "", isActive }) => {
	const [active, setActive] = useState(isActive);

	const handleClick = () => {
		onClick();
	};

	return (
		<button
			onClick={handleClick}
			aria-label={ariaLabel}
			className={`w-14 h-14 border-2 border-white rounded-full flex items-center justify-center transition ${active ? "bg-slate-400" : ""}`}
		>
			<i className={`fas ${icon} ${active ? "text-white" : "text-gray-500"} text-xl`}></i>
		</button>
	);
};

export default ActionButton;
