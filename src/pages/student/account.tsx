import { StudentInfo } from '@/pages/student/home';
import {
	faCalendar,
	faEnvelope,
	faKey,
	faPhone,
	faUser,
	faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

interface PasswordForm {
	oldPassword: string;
	newPassword: string;
}

const AccountPage = () => {
	const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<Partial<StudentInfo>>({});
	const [passwordForm, setPasswordForm] = useState<PasswordForm>({
		oldPassword: '',
		newPassword: '',
	});

	useEffect(() => {
		const storedInfo = localStorage.getItem('studentInfo');
		if (storedInfo) {
			setStudentInfo(JSON.parse(storedInfo));
			setFormData(JSON.parse(storedInfo));
		}
	}, []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordForm({
			...passwordForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!studentInfo) return;

			if (passwordForm.newPassword) {
				if (passwordForm.oldPassword !== studentInfo.password) {
					toast.error('Mật khẩu cũ không chính xác!');
					return;
				}
			}

			const updatedInfo: StudentInfo = {
				fullName: formData.fullName ?? studentInfo.fullName,
				studentId: studentInfo.studentId,
				email: formData.email ?? studentInfo.email,
				phoneNumber: formData.phoneNumber ?? studentInfo.phoneNumber,
				pagesRemaining: studentInfo.pagesRemaining,
				loginHistory: studentInfo.loginHistory,
				gender: formData.gender,
				yearOfBirth: formData.yearOfBirth ?? studentInfo.yearOfBirth,
				password: passwordForm.newPassword || studentInfo.password,
			};

			localStorage.setItem('studentInfo', JSON.stringify(updatedInfo));
			setStudentInfo(updatedInfo);
			setIsEditing(false);
			setPasswordForm({ oldPassword: '', newPassword: '' });
			toast.success('Thông tin đã được cập nhật thành công!');
		} catch {
			toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
		}
	};

	const formatDateForInput = (year: string | number | undefined) => {
		if (!year) return '';
		if (typeof year === 'number' || year.length === 4) {
			return `${year}-01-01`;
		}
		return year;
	};

	if (!studentInfo) return <div>Loading...</div>;

	return (
		<div className='mx-auto max-w-7xl'>
			<Helmet>
				<title>Thông Tin Tài Khoản | HCMUT</title>
			</Helmet>
			<h1 className='mb-6 text-2xl font-bold text-gray-800'>
				Thông Tin Tài Khoản
			</h1>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					<div className='relative'>
						<label className='mb-2 block text-sm font-medium text-gray-700'>
							<FontAwesomeIcon icon={faUser} className='mr-2' />
							Họ và tên
						</label>
						<input
							type='text'
							name='fullName'
							value={
								isEditing
									? formData.fullName
									: studentInfo.fullName
							}
							onChange={handleInputChange}
							disabled={!isEditing}
							className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
						/>
					</div>

					<div className='relative'>
						<label className='mb-2 block text-sm font-medium text-gray-700'>
							<FontAwesomeIcon
								icon={faEnvelope}
								className='mr-2'
							/>
							Email
						</label>
						<input
							type='email'
							name='email'
							value={
								isEditing ? formData.email : studentInfo.email
							}
							onChange={handleInputChange}
							disabled={!isEditing}
							className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
						/>
					</div>

					<div className='relative'>
						<label className='mb-2 block text-sm font-medium text-gray-700'>
							<FontAwesomeIcon icon={faPhone} className='mr-2' />
							Số điện thoại
						</label>
						<input
							type='tel'
							name='phoneNumber'
							value={
								isEditing
									? formData.phoneNumber
									: studentInfo.phoneNumber
							}
							onChange={handleInputChange}
							disabled={!isEditing}
							className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
						/>
					</div>

					<div className='relative'>
						<label className='mb-2 block text-sm font-medium text-gray-700'>
							<FontAwesomeIcon
								icon={faCalendar}
								className='mr-2'
							/>
							Năm sinh
						</label>
						<input
							type='date'
							name='yearOfBirth'
							value={formatDateForInput(
								isEditing
									? formData.yearOfBirth
									: studentInfo.yearOfBirth,
							)}
							onChange={handleInputChange}
							disabled={!isEditing}
							max={new Date().toISOString().split('T')[0]}
							className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
						/>
					</div>

					<div className='relative'>
						<label className='mb-2 block text-sm font-medium text-gray-700'>
							<FontAwesomeIcon
								icon={faVenusMars}
								className='mr-2'
							/>
							Giới tính
						</label>
						<select
							name='gender'
							value={
								isEditing ? formData.gender : studentInfo.gender
							}
							onChange={handleInputChange}
							disabled={!isEditing}
							className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
						>
							<option value=''>Chọn giới tính</option>
							<option value='male'>Nam</option>
							<option value='female'>Nữ</option>
							<option value='other'>Khác</option>
						</select>
					</div>

					{isEditing && (
						<div className='space-y-6 md:col-span-2'>
							<div className='relative'>
								<label className='mb-2 block text-sm font-medium text-gray-700'>
									<FontAwesomeIcon
										icon={faKey}
										className='mr-2'
									/>
									Mật khẩu cũ
								</label>
								<input
									type='password'
									name='oldPassword'
									value={passwordForm.oldPassword}
									onChange={handlePasswordChange}
									className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500'
									placeholder='Nhập mật khẩu cũ'
								/>
							</div>
							<div className='relative'>
								<label className='mb-2 block text-sm font-medium text-gray-700'>
									<FontAwesomeIcon
										icon={faKey}
										className='mr-2'
									/>
									Mật khẩu mới
								</label>
								<input
									type='password'
									name='newPassword'
									value={passwordForm.newPassword}
									onChange={handlePasswordChange}
									className='w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500'
									placeholder='Nhập mật khẩu mới'
								/>
							</div>
						</div>
					)}
				</div>

				<div className='mt-6 flex justify-end space-x-4'>
					{!isEditing ? (
						<button
							type='button'
							onClick={() => setIsEditing(true)}
							className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
						>
							Chỉnh sửa
						</button>
					) : (
						<>
							<button
								type='button'
								onClick={() => {
									setIsEditing(false);
									setFormData(studentInfo);
								}}
								className='rounded-lg bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600'
							>
								Hủy
							</button>
							<button
								type='submit'
								className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
							>
								Lưu thay đổi
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default AccountPage;
