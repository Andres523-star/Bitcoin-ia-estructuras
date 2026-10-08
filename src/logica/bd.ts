import { supabase } from "./supabase";
import type { Cripto } from "../modelos/Cripto";
import type { Analisis } from "../modelos/Analisis";
import type { Orden } from "../modelos/Orden";

// === Criptos ===
export async function cargarCriptos(): Promise<Cripto[]> {
  const { data, error } = await supabase
    .from("criptos")
    .select("*")
    .order("capitalizacion", { ascending: false });

  if (error) {
    console.error("Error cargando criptos:", error);
    return [];
  }

  return (data || []).map((c) => ({
    simbolo: c.simbolo,
    nombre: c.nombre,
    precioActual: c.precio_actual,
    capitalizacion: c.capitalizacion,
    volatilidad: c.volatilidad,
  }));
}

export async function guardarCripto(cripto: Cripto): Promise<boolean> {
  const { error } = await supabase.from("criptos").insert({
    simbolo: cripto.simbolo,
    nombre: cripto.nombre,
    precio_actual: cripto.precioActual,
    capitalizacion: cripto.capitalizacion,
    volatilidad: cripto.volatilidad,
  });
  if (error) {
    console.error("Error guardando cripto:", error);
    return false;
  }
  return true;
}

// === Análisis ===
export async function cargarAnalisis(): Promise<Analisis[]> {
  const { data, error } = await supabase
    .from("analisis")
    .select("*")
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error cargando análisis:", error);
    return [];
  }

  return (data || []).map((a) => ({
    id: a.id,
    monto: a.monto,
    tiempoMeses: a.tiempo_meses,
    crecimientoEsperado: a.crecimiento_esperado,
    durabilidad: a.durabilidad,
    recomendacion: a.recomendacion,
    fecha: new Date(a.fecha).getTime(),
  }));
}

export async function guardarAnalisis(
  analisis: Omit<Analisis, "id">
): Promise<Analisis | null> {
  const { data, error } = await supabase
    .from("analisis")
    .insert({
      monto: analisis.monto,
      tiempo_meses: analisis.tiempoMeses,
      crecimiento_esperado: analisis.crecimientoEsperado,
      durabilidad: analisis.durabilidad,
      recomendacion: analisis.recomendacion,
    })
    .select()
    .single();

  if (error) {
    console.error("Error guardando análisis:", error);
    return null;
  }

  return {
    id: data.id,
    monto: data.monto,
    tiempoMeses: data.tiempo_meses,
    crecimientoEsperado: data.crecimiento_esperado,
    durabilidad: data.durabilidad,
    recomendacion: data.recomendacion,
    fecha: new Date(data.fecha).getTime(),
  };
}

// === Órdenes ===
export async function cargarOrdenes(): Promise<Orden[]> {
  const { data, error } = await supabase
    .from("ordenes")
    .select("*")
    .eq("estado", "PENDIENTE")
    .order("creada_en", { ascending: true });

  if (error) {
    console.error("Error cargando órdenes:", error);
    return [];
  }

  return (data || []).map((o) => ({
    id: o.id,
    simbolo: o.simbolo,
    monto: o.monto,
    tiempoMeses: o.tiempo_meses,
    estado: o.estado,
    creadaEn: new Date(o.creada_en).getTime(),
  }));
}

export async function guardarOrden(
  orden: Omit<Orden, "id">
): Promise<Orden | null> {
  const { data, error } = await supabase
    .from("ordenes")
    .insert({
      simbolo: orden.simbolo,
      monto: orden.monto,
      tiempo_meses: orden.tiempoMeses,
      estado: orden.estado,
    })
    .select()
    .single();

  if (error) {
    console.error("Error guardando orden:", error);
    return null;
  }

  return {
    id: data.id,
    simbolo: data.simbolo,
    monto: data.monto,
    tiempoMeses: data.tiempo_meses,
    estado: data.estado,
    creadaEn: new Date(data.creada_en).getTime(),
  };
}

export async function marcarOrdenCompletada(id: number): Promise<boolean> {
  const { error } = await supabase
    .from("ordenes")
    .update({ estado: "COMPLETADA" })
    .eq("id", id);
  if (error) {
    console.error("Error actualizando orden:", error);
    return false;
  }
  return true;
}