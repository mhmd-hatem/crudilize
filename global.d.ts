import { MimeType, MaterialType, TestType, PrismaClient } from "@prisma/client";
import { CustomErrorTypes } from "@/middlewares/errorHandler";
import type { NextMiddleware, NextRequest, NextResponse } from "next/server";

declare global {
  var prismaGlobal: PrismaClient | undefined;

  interface BigInt {
    toJSON: () => string;
  }

  type NextRouteError = Error & { type: CustomErrorTypes };

  type NextRouteMiddleware = (
    req: NextRequest,
    res: NextResponse,
    next: NextRouteMiddleware
  ) => NextMiddlewareResult | Promise<NextMiddlewareResult>;
}

export { };
