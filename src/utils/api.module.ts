import { Module } from "@nestjs/common";
import { apiFactory } from "./api.factory";

@Module({exports:[apiFactory],providers:[apiFactory]})
export class apiModule{};