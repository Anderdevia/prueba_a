using System;

namespace Aplicacionconsola
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("Calcular el área de dos tipos de figuras geométricas");
                Console.WriteLine("1. Calcular área de un círculo");
                Console.WriteLine("2. Calcular área de un rectángulo");
                Console.WriteLine("3. Salir");

                Console.Write("Por favor seleccione una opción (1,2,3): ");
                string opcion = Console.ReadLine();

                if (opcion == "1")
                {
                    Console.Write("Ingresa el radio del círculo: ");
                    double radio = double.Parse(Console.ReadLine());
                    double area = Math.PI * Math.Pow(radio, 2);
                    Console.WriteLine($"El área del círculo es: {Math.Round(area, 2)}");
                }
                else if (opcion == "2")
                {
                    Console.Write("Ingresa la base del rectángulo: ");
                    double baseRectangulo = double.Parse(Console.ReadLine());
                    Console.Write("Ingresa la altura del rectángulo: ");
                    double alturaRectangulo = double.Parse(Console.ReadLine());
                    double area = baseRectangulo * alturaRectangulo;
                    Console.WriteLine($"El área del rectángulo es:  {Math.Round(area, 2)}");
                }
                else if (opcion == "3")
                {
                    Console.WriteLine("¡Aplicación Cerrada!");
                    break;
                }
                else
                {
                    Console.WriteLine("Está opción no es válida. Por favor, elige 1, 2 o 3.");
                }
            }
        }
    }
}
