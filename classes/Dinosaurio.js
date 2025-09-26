class Dinosaurio {
  constructor({ id, nombre, especie, periodo, dieta }) {
    this.id = id ?? null;
    this.nombre = nombre ?? "";
    this.especie = especie ?? "";
    this.periodo = periodo ?? "";
    this.dieta = dieta ?? "";
  }

  validar() {
    if (!this.nombre) throw new Error("Nombre requerido");
    if (!this.especie) throw new Error("Especie requerida");
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      especie: this.especie,
      periodo: this.periodo,
      dieta: this.dieta,
    };
  }
}

module.exports = Dinosaurio;
