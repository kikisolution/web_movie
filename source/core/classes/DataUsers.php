<?php

namespace Source\core\classes;

class DataUsers {

	public function userData() {

		if (isset($_SESSION['logged'])) {
			return $_SESSION['dataUser'];
		}
		return false;

	}

    public function setSession(array $data) {

        $_SESSION["logged"] = true;
        $_SESSION["dataUser"] = $data;
        session_regenerate_id();

        return true;

    }


}