Đã có tự động tạo `.htaccess` và `_redirects` để chạy được trên server của Netlify hoặc hosting.

Để chạy như app router trong nextjs, build rồi tạo iframe với thuộc tính `src` là đường dẫn đến file `index.html` sau khi build.

## Tải code đã build tại [đây](https://github.com/dennivan/hcmut/releases/download/latest/code.zip)

### Cấu trúc thư mục

![Cấu trúc thư mục](https://github.com/dennivan/hcmut/blob/main/.github/images/structure.png)

-   Cấu trúc thư mục
    ```
    src/
    ├── assets/         # Hình ảnh và tài nguyên tĩnh
    ├── components/     # Components tái sử dụng
    ├── contexts/       # React Context
    └── pages/         # Các trang của ứng dụng
        ├── global/    # Trang đăng nhập/đăng ký
        └── logged-in/ # Các trang sau đăng nhập
    ```

### Thông Tin Đăng Nhập (src/pages/login.tsx)

-   dòng 17 file `src/pages/login.tsx`:

    ```typescript
    const DEMO_CREDENTIALS = {
      student: {
        username: '123456789',
        password: '123456789',
      },
      admin: {
        username: 'admin',
        password: 'admin',
      },
    } as const;
    ```

-   dòng 28 file `src/pages/login.tsx`:

    ```typescript
      const LOGIN_MESSAGES = {
        success: 'Đăng nhập thành công',
        invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không chính xác',
        emptyFields: 'Vui lòng nhập đầy đủ thông tin',
    } as const;
    ```

-   Data đăng nhập được lưu trong `localStorage` với key `isAuthenticated`, `userType`

### Thông Tin Tổng Quan (src/pages/logged-in/info.tsx)

-   Data ở dòng 13 file `src/pages/loged-in/info.tsx`:

    ```typescript
    const DASHBOARD_DATA = {
        printers: {
            total: 40,
        },
        statistics: {
            errorsToday: 2,
            activePrinters: 38,
            usersPrinting: 100,
            pagesTotal: 2728,
            topUser: {
            name: 'Nguyễn Văn A',
                pages: 128,
            },
        },
    };
    ```

### Quản Lý Máy In (src/pages/logged-in/printer.tsx)

-   Data ở dòng 21 file `src/pages/loged-in/printer.tsx`:

    ```typescript
    const MOCK_PRINTERS = [
        {
          id: '1',
          brand: 'HP',
          model: 'Xịn nhất',
          paperQuantity: 500,
          dateAdded: '2024-11-18',
          type: 'laser',
          note: '',
          building: 'H1',
          floor: '201',
          status: 'active',
        },
        {
          id: '2',
          brand: 'Đéll',
          model: 'Cùi bắp',
          paperQuantity: 200,
          dateAdded: '2024-11-18',
          type: 'inkjet',
          note: '',
          building: 'H2',
          floor: '301',
          status: 'maintenance',
        },
    ];
    ```

### Lịch Sử in (src/pages/logged-in/history.tsx)

-   Data ở dòng 21 file `src/pages/loged-in/history.tsx`:
    ```typescript
    const PRINT_HISTORY: PrintHistory[] = [
        {
            id: 'history_7',
            monthYear: '9/2024',
            studentName: 'SV 7',
            studentCode: 'MEOMEO74361',
            printerName: 'Máy 7',
            printerCode: 'PR5096',
            location: 'H1-833',
            printedPages: 82,
            dateTime: '2024-02-05 17:00',
            purpose: 'Dự án',
            printerStatus: 'maintenance',
            administrator: 'Giáo viên 3',
            note: ''
        },
        {
            id: 'history_8',
            monthYear: '7/2024',
            studentName: 'SV 8',
            studentCode: 'MEOMEO18427',
            printerName: 'Máy 8',
            printerCode: 'PR2977',
            location: 'H2-900',
            printedPages: 53,
            dateTime: '2024-09-11 17:00',
            purpose: 'Bài tập',
            printerStatus: 'maintenance',
            administrator: 'Giáo viên 5',
            note: ''
        },
        {
            id: 'history_9',
            monthYear: '4/2024',
            studentName: 'SV 9',
            studentCode: 'MEOMEO77508',
            printerName: 'Máy 9',
            printerCode: 'PR4169',
            location: 'H3-305',
            printedPages: 28,
            dateTime: '2024-07-23 17:00',
            purpose: 'Cá nhân',
            printerStatus: 'active',
            administrator: 'Giáo viên 3',
            note: ''
            },
        {
            id: 'history_10',
            monthYear: '8/2024',
            studentName: 'SV 10',
            studentCode: 'MEOMEO24052',
            printerName: 'Máy 10',
            printerCode: 'PR4489',
            location: 'H1-162',
            printedPages: 13,
            dateTime: '2024-11-20 17:00',
            purpose: 'Dự án',
            printerStatus: 'active',
            administrator: 'Giáo viên 5',
            note: 'Con vịt béo'
        }
    ];
    ```

### Thống Kê Máy In (src/pages/logged-in/report.tsx)

-   Data ở dòng 21 file `src/pages/loged-in/report.tsx`:

    ```typescript
    const MOCK_DATA: UsageRecord[] = [
        ...Array.from({ length: 25 }, (_, i) => ({
            time: `${(i + 1).toString().padStart(2, '0')}:00 AM`,
            user: `User ${i + 1}`,
            pages: Math.floor(Math.random() * 50) + 1,
            fileName: `File ${i + 1}.pdf`,
            fileType: 'pdf',
        })),
    ];
    ```

### Thông tin mặc định học sinh (src/pages/student/home.tsx)

-   `Cần thay thế bằng data bên api`

-   Dòng 13 file `src/pages/student/home.tsx`:

    ```typescript
    const initialStudentInfo = {
    fullName: 'Chưa cập nhật',
    studentId: '',
    email: 'Chưa cập nhật',
    phoneNumber: 'Chưa cập nhật',
    pagesRemaining: 0,
    loginHistory: [],
    };
    ```

### Lịch sử in "HỌC SINH" (src/pages/student/print-history.tsx)

-   Data ở dòng 6 file `src/pages/student/print-history.tsx`:
-   Sửa logic lấy data thêm từ api ở dòng 143 file `src/pages/student/print-history.tsx`:
    ```typescript
    	const handleLoadMore = () => {
        // Call với axios hoặc fetch gì đó
    };
    ```

### Thanh toán (src/pages/student/payment.tsx)

-   Data ở dòng 36 file `src/pages/student/payment.tsx`:
    ```typescript
    const MOCK_PAYMENT_INFO = {
        bankId: 'ACB',
        accountNo: '25980567',
        accountName: 'NGUYEN VAN BINL',
        template: 'compact',
        pricePerPage: 500,
    };
    ```
-   Call API để lấy lịch sử, dùng `useEffect` dòng 57 file `src/pages/student/payment.tsx`

### In tài liệu (src/pages/student/components/print.tsx)

-   Sửa logic upload file ở dòng 95 file `src/pages/student/components/print.tsx`:
    ```typescript
    const handleUpload = () => {
        // đẩy file lên server
    };
    ```

## Nếu cần trợ giúp, nhắn tele: [@ovftank](https://t.me/ovftank)
