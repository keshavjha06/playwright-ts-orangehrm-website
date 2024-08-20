export class Env {
    public static readonly BASE_URL = process.env.URL ?? "Default";
    public static readonly USERNAME = process.env.USERNAME ?? "Default";
    public static readonly PASSWORD = process.env.PASSWORD ?? "Default"
}