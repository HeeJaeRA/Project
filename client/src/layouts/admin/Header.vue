<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" @click="$router.push('/admin/home')"
      ><img
        style="width: 160px; height: 42px; padding-left: 15px"
        src="../../assets/images/logo_white.png"
    /></a>
    <!-- Navbar Search-->
    <form
      class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
    >
      <div class="input-group" style="display: none">
        <input
          class="form-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
        />
        <button class="btn btn-primary" id="btnNavbarSearch" type="button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>

    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fas fa-user fa-fw"></i
        ></a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <!-- 				<li><a class="dropdown-item" href="#!">Settings</a></li> -->
          <!-- 				<li><a class="dropdown-item" href="#!">Activity Log</a></li> -->
          <!-- 				<li><hr class="dropdown-divider" /></li> -->
          <li><a class="dropdown-item" @click="logout()">Logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
