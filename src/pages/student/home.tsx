import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export interface StudentInfo {
	fullName: string;
	studentId: string;
	email: string;
	phoneNumber: string;
	gender?: string;
	yearOfBirth?: string;
	pagesRemaining: number;
	password?: string;
	loginHistory: string[];
}

const initialStudentInfo: StudentInfo = {
	fullName: 'Chưa cập nhật',
	studentId: '',
	email: 'Chưa cập nhật',
	phoneNumber: 'Chưa cập nhật',
	pagesRemaining: 0,
	loginHistory: [],
};

const Home: React.FC = () => {
	const [studentInfo, setStudentInfo] =
		useState<StudentInfo>(initialStudentInfo);

	useEffect(() => {
		const storedInfo = localStorage.getItem('studentInfo');
		if (storedInfo) {
			const parsedInfo = JSON.parse(storedInfo);
			setStudentInfo({
				...initialStudentInfo,
				...parsedInfo,
				loginHistory: parsedInfo.loginHistory || [],
			});
		} else {
			localStorage.setItem(
				'studentInfo',
				JSON.stringify(initialStudentInfo),
			);
		}
	}, []);

	return (
		<div className='bg-gray-50'>
			<Helmet>
				<title>Trang chủ | HCMUT</title>
			</Helmet>
			<div className='mx-auto max-w-7xl'>
				<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
					<div className='rounded-lg bg-white p-6 shadow-sm'>
						<div className='mb-6 flex items-center'>
							<FontAwesomeIcon
								icon={faCircleUser}
								className='mr-4 h-20 w-20 text-blue-400'
							/>
							<div>
								<h2 className='text-2xl font-medium text-blue-600'>
									Sinh viên
								</h2>
								<p className='text-xl text-gray-800'>
									{studentInfo.fullName}
								</p>
								<p className='text-md text-gray-600'>
									MSSV: {studentInfo.studentId}
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='rounded-lg bg-blue-50 p-4'>
								<h3 className='mb-2 font-medium text-blue-700'>
									Số trang in còn lại
								</h3>
								<p className='text-3xl font-bold text-blue-600'>
									{studentInfo.pagesRemaining}
								</p>
							</div>

							<div className='rounded-lg border p-4'>
								<h3 className='mb-2 font-medium text-gray-700'>
									Thông tin liên hệ
								</h3>
								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<span className='text-gray-600'>
											Email:
										</span>
										<span className='font-medium'>
											{studentInfo.email}
										</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-gray-600'>
											Số điện thoại:
										</span>
										<span className='font-medium'>
											{studentInfo.phoneNumber}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='rounded-lg bg-white p-6 shadow-sm'>
						<h3 className='mb-4 text-xl font-medium text-blue-600'>
							Hoạt động đăng nhập gần đây
						</h3>
						<div className='space-y-3'>
							{studentInfo.loginHistory.map((login, index) => (
								<div
									key={`login-${login}-${index}`}
									className='flex items-center rounded-lg border p-3 transition-colors hover:bg-gray-50'
								>
									<span className='text-gray-600'>
										{login}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
