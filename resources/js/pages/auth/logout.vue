<template>
  <VListItemTitle @click="logout">Logout</VListItemTitle>
</template>

<script>
import mainURL from "@/axios";
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";


export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      // Lakukan permintaan logout menggunakan Axios
      mainURL.post('/logout')
        .then(response => {
          // Menghapus data pengguna dari localStorage
          localStorage.removeItem("userData");
          localStorage.removeItem("userToken");

          // Menampilkan pesan sukses menggunakan SweetAlert2
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Yeay',
            text: 'Berhasill logout'
          });

          // Mengarahkan pengguna kembali ke halaman login
          router.push("/login");
        })
        .catch(error => {
          // Jika terjadi kesalahan dalam permintaan, tampilkan pesan error
          // console.error('Error during logout:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat melakukan logout'
          });
        });
    };

    return { logout };
  },
};
</script>
