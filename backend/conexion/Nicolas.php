<?php

class Nicolas
{
    private $host = "localhost";
    // private $user = "u495112148_tupodcast";
    private $user = "root";
    private $pass = "";
    
    // private $pass = "@Tupodcast1";
    private $db = "tupodcast";
    // private $db = "u495112148_tupodcast";
    public $dbConnect;

    public $respuesta = array();
    public function __construct()
    {
        $this->dbConnect = new mysqli($this->host, $this->user, $this->pass, $this->db);
        if ($this->dbConnect->connect_error) {
            die("Error en la conexión a la base de datos: " . $this->dbConnect->connect_error);
        }
    }
    public function getDbConnect()
    {
        return $this->dbConnect;
    }

    public function postInsert($table, $camps, $vals, $bind_param, $data_camps)
    {
        $respuesta = []; // Inicializar la respuesta
    
        $sql = "INSERT INTO $table ($camps) VALUES ($vals)";
    
        $stmt = mysqli_prepare($this->dbConnect, $sql);
        if (!$stmt) {
            // Si hay un error en la preparación de la consulta
            $respuesta["success"] = false;
            $respuesta["message"] = "Error en la preparación de la consulta: " . mysqli_error($this->dbConnect);
        } else {
            // Enlaza los parámetros y ejecuta la consulta
            if (!mysqli_stmt_bind_param($stmt, $bind_param, ...$data_camps)) {
                // Si hay un error al enlazar los parámetros
                $respuesta["success"] = false;
                $respuesta["message"] = "Error al enlazar los parámetros: " . mysqli_stmt_error($stmt);
            } else {
                // Ejecuta la consulta
                if (!mysqli_stmt_execute($stmt)) {
                    // Si hay un error al ejecutar la consulta
                    $respuesta["success"] = false;
                    $respuesta["message"] = "Error en la consulta: " . mysqli_error($this->dbConnect);
                } else {
                    // Si la consulta se ejecuta correctamente, obtener el ID del nuevo registro
                    $newId = mysqli_insert_id($this->dbConnect);
                    $respuesta["success"] = true;
                    $respuesta["message"] = "Consulta satisfactoria";
                    $respuesta["newId"] = $newId; // Agregar el ID del nuevo registro a la respuesta
                }
            }
            // Cierra el statement
            mysqli_stmt_close($stmt);
        }
        return json_encode($respuesta);
    }
    

    public function getData($table)
    {
        $data = array();
        $sql = "SELECT *FROM $table";
        $result = $this->dbConnect->query($sql);
        if (!$result) {
            throw new Exception("Error en la consulta :" . $this->dbConnect->error);
        } else {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }
    public function getCamposSinCondicion($camposObtener, $table)
    {
        $data = array();
        $sql = "SELECT $camposObtener FROM $table";
        $result = $this->dbConnect->query($sql);
        if (!$result) {
            throw new Exception("Error en la consulta :" . $this->dbConnect->error);
        } else {
            while ($row = $result->fetch_assoc())
                $data[] = $row;
        }
        return $data;
    }





    // PODCAST CON LA IMAGEN Y UN RESUMEN
    // FOTO - TITULO - FECHA DE PRODUCCICÓN - OBTENERLO CON EL USUARIO EL ID DEL USUARIO


    public function getDataWhere($table, $condicion, $datacondicion){
        $sql = "SELECT * FROM $table WHERE $condicion = ?";
        $stmt = mysqli_prepare($this->dbConnect, $sql);
        if(!$stmt){
            throw new Exception ("Error: ". $this->dbConnect->error);
        }
        mysqli_stmt_bind_param($stmt, "i", $datacondicion); // Solo se necesita un marcador de posición para el valor de la condición
        if(mysqli_stmt_execute($stmt)){ // Verifica si la ejecución fue exitosa
            $result = mysqli_stmt_get_result($stmt);
            $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
            // Registro de depuración
            if (empty($rows)) {
                error_log("No se encontraron podcasts para el usuario con ID: $datacondicion");
            }
            return $rows;
        } else {
            throw new Exception("Error al ejecutar la consulta". $stmt->error);
        }
    }
    public function deletedata($tabla, $condicion, $data)
    {
        $sql = "DELETE FROM $tabla WHERE $condicion = ?";
        $stmt = $this->dbConnect->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta: " . $this->dbConnect->error);
        }
        $stmt->bind_param("i", $data); // Aquí debes usar "i" para representar un entero
        if (!$stmt->execute()) {
            return false;
        }
        $stmt->close();
        return true;
    }
    
}
