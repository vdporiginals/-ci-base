# Base CI Auth Module for Angular

Thư Viện gồm các Base Api DataAcces, Interceptor,Directives,Guard,Base Auth UI component and Some logic Utils

## Components

### Login Components

- Config: uiOption

---

     - custom: là giao diên có thể custom
     - material: giao diện login material

- **Input:**

---

- **classCustom:** truyền vào class để css cho component
- **title:** Title component
- **cấu trúc class:**

  ```
    .classCustom{
     .title
     .form{
      .user-name (input tài khoản){
       input
      }
      .password (input password){
       input
      }
      .action (các button tương tác form){
       .btn-login (button login)
       .btn-signup (button signup)
      }
     }
    }
  ```

  - **ngContent:** truyền vào thẻ label để custom thêm giao diện đăng nhập

    ```
       <ci-login>
        <label>giao diện custom</label>
       </ci-login>
    ```

  - **Demo:**

    ```
     <ci-login [title]="'Đăng nhập'" [classCustom]="'login'">
      <label>
       Lưu thông tin đăng nhập
       <input type="checkbox" />
      </label>
     </ci-login>

    ```
