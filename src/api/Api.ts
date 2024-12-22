/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Animal {
  /** ID */
  pk?: number;
  /**
   * Type
   * @minLength 1
   * @maxLength 100
   */
  type: string;
  /**
   * Genus
   * @minLength 1
   * @maxLength 100
   */
  genus: string;
  /** Status */
  status?: "draft" | "formed" | "completed" | "cancelled" | "deleted";
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Final population
   * @min -2147483648
   * @max 2147483647
   */
  final_population?: number | null;
}

export interface PutAnimal {
  /**
   * Type
   * @minLength 1
   */
  type: string;
  /**
   * Genus
   * @minLength 1
   */
  genus: string;
  /** Status */
  status?: "draft" | "formed" | "completed" | "cancelled" | "deleted";
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Final population
   * @min -2147483648
   * @max 2147483647
   */
  final_population?: number | null;
}

export interface AcceptAnimal {
  /** Accept */
  accept: boolean;
}

export interface HabitatList {
  /** ID */
  pk?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Picture url
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  picture_url: string;
}

export interface HabitatDetail {
  /** ID */
  pk?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Status */
  status?: "active" | "deleted";
  /**
   * Picture url
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  picture_url: string;
}

export interface AddImage {
  /** Habitat id */
  habitat_id: number;
  /**
   * Picture url
   * @format uri
   * @minLength 1
   */
  picture_url: string;
}

export interface AuthToken {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserUpdate {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
}

export interface UserRegistration {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://192.168.30.131:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://192.168.30.131:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  addPopulationToAnimal = {
    /**
     * @description Update the price of a threat in a request.
     *
     * @tags add-population-to-animal
     * @name AddPopulationToAnimalHabitatUpdate
     * @request PUT:/add-population-to-animal/{animal_pk}/habitat/{habitat_pk}/
     * @secure
     */
    addPopulationToAnimalHabitatUpdate: (
      animalPk: string,
      habitatPk: string,
      data: {
        /** Популяция для МО */
        population: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/add-population-to-animal/${animalPk}/habitat/${habitatPk}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Remove a threat from a request.
     *
     * @tags add-population-to-animal
     * @name AddPopulationToAnimalHabitatDelete
     * @request DELETE:/add-population-to-animal/{animal_pk}/habitat/{habitat_pk}/
     * @secure
     */
    addPopulationToAnimalHabitatDelete: (animalPk: string, habitatPk: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/add-population-to-animal/${animalPk}/habitat/${habitatPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  animal = {
    /**
     * @description Get details of a request by ID, including associated threats.
     *
     * @tags animal
     * @name AnimalRead
     * @request GET:/animal/{id}/
     * @secure
     */
    animalRead: (id: string, params: RequestParams = {}) =>
      this.request<Animal, any>({
        path: `/animal/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a request by ID.
     *
     * @tags animal
     * @name AnimalUpdate
     * @request PUT:/animal/{id}/
     * @secure
     */
    animalUpdate: (id: string, data: PutAnimal, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/animal/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  deleteAnimal = {
    /**
     * @description Approve or decline a request (for moderators).
     *
     * @tags delete-animal
     * @name DeleteAnimalUpdate
     * @request PUT:/delete-animal/{id}/
     * @secure
     */
    deleteAnimalUpdate: (id: string, data: AcceptAnimal, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-animal/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a request (for moderators).
     *
     * @tags delete-animal
     * @name DeleteAnimalDelete
     * @request DELETE:/delete-animal/{id}/
     * @secure
     */
    deleteAnimalDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/delete-animal/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  deleteFromAnimal = {
    /**
     * @description Update the price of a threat in a request.
     *
     * @tags delete-from-animal
     * @name DeleteFromAnimalHabitatUpdate
     * @request PUT:/delete-from-animal/{animal_pk}/habitat/{habitat_pk}/
     * @secure
     */
    deleteFromAnimalHabitatUpdate: (
      animalPk: string,
      habitatPk: string,
      data: {
        /** Популяция для МО */
        population: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/delete-from-animal/${animalPk}/habitat/${habitatPk}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Remove a threat from a request.
     *
     * @tags delete-from-animal
     * @name DeleteFromAnimalHabitatDelete
     * @request DELETE:/delete-from-animal/{animal_pk}/habitat/{habitat_pk}/
     * @secure
     */
    deleteFromAnimalHabitatDelete: (animalPk: string, habitatPk: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-from-animal/${animalPk}/habitat/${habitatPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  formAnimal = {
    /**
     * @description Mark a request as formed. Only available for requests with a 'draft' status.
     *
     * @tags form-animal
     * @name FormAnimalUpdate
     * @request PUT:/form-animal/{id}/
     * @secure
     */
    formAnimalUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/form-animal/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  habitats = {
    /**
     * @description Получение списка мест обитания. Можно отфильтровать по его названию.
     *
     * @tags habitats
     * @name HabitatsList
     * @request GET:/habitats/
     * @secure
     */
    habitatsList: (
      query?: {
        /**
         * Название места обитания
         * @default ""
         */
        title?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HabitatList[], any>({
        path: `/habitats/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление МО в заявку-черновик пользователя. Создается новая заявка, если не существует заявки-черновика
     *
     * @tags habitats
     * @name HabitatsAddCreate
     * @request POST:/habitats/add/{id}/
     * @secure
     */
    habitatsAddCreate: (
      id: string,
      pk: number,
      data: {
        /**
         * Популяция в данном МО
         * @example 10000
         */
        population?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/habitats/add/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном месте обитания по ID.
     *
     * @tags habitats
     * @name HabitatsCreateList
     * @request GET:/habitats/create/
     * @secure
     */
    habitatsCreateList: (params: RequestParams = {}) =>
      this.request<HabitatDetail, any>({
        path: `/habitats/create/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsCreateCreate
     * @request POST:/habitats/create/
     * @secure
     */
    habitatsCreateCreate: (data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsCreateUpdate
     * @request PUT:/habitats/create/
     * @secure
     */
    habitatsCreateUpdate: (data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/create/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление места обитания по ID (moderators only).
     *
     * @tags habitats
     * @name HabitatsCreateDelete
     * @request DELETE:/habitats/create/
     * @secure
     */
    habitatsCreateDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/habitats/create/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном месте обитания по ID.
     *
     * @tags habitats
     * @name HabitatsDeleteRead
     * @request GET:/habitats/delete/{id}/
     * @secure
     */
    habitatsDeleteRead: (id: string, params: RequestParams = {}) =>
      this.request<HabitatDetail, any>({
        path: `/habitats/delete/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsDeleteCreate
     * @request POST:/habitats/delete/{id}/
     * @secure
     */
    habitatsDeleteCreate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/delete/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsDeleteUpdate
     * @request PUT:/habitats/delete/{id}/
     * @secure
     */
    habitatsDeleteUpdate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/delete/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление места обитания по ID (moderators only).
     *
     * @tags habitats
     * @name HabitatsDeleteDelete
     * @request DELETE:/habitats/delete/{id}/
     * @secure
     */
    habitatsDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/habitats/delete/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Upload an image for a specific threat.
     *
     * @tags habitats
     * @name HabitatsImageCreate
     * @request POST:/habitats/image/
     * @secure
     */
    habitatsImageCreate: (data: AddImage, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/habitats/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном месте обитания по ID.
     *
     * @tags habitats
     * @name HabitatsUpdateRead
     * @request GET:/habitats/update/{id}/
     * @secure
     */
    habitatsUpdateRead: (id: string, params: RequestParams = {}) =>
      this.request<HabitatDetail, any>({
        path: `/habitats/update/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsUpdateCreate
     * @request POST:/habitats/update/{id}/
     * @secure
     */
    habitatsUpdateCreate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/update/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsUpdateUpdate
     * @request PUT:/habitats/update/{id}/
     * @secure
     */
    habitatsUpdateUpdate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/update/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление места обитания по ID (moderators only).
     *
     * @tags habitats
     * @name HabitatsUpdateDelete
     * @request DELETE:/habitats/update/{id}/
     * @secure
     */
    habitatsUpdateDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/habitats/update/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном месте обитания по ID.
     *
     * @tags habitats
     * @name HabitatsRead
     * @request GET:/habitats/{id}/
     * @secure
     */
    habitatsRead: (id: string, params: RequestParams = {}) =>
      this.request<HabitatDetail, any>({
        path: `/habitats/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsCreate
     * @request POST:/habitats/{id}/
     * @secure
     */
    habitatsCreate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags habitats
     * @name HabitatsUpdate
     * @request PUT:/habitats/{id}/
     * @secure
     */
    habitatsUpdate: (id: string, data: HabitatDetail, params: RequestParams = {}) =>
      this.request<HabitatDetail, void>({
        path: `/habitats/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление места обитания по ID (moderators only).
     *
     * @tags habitats
     * @name HabitatsDelete
     * @request DELETE:/habitats/{id}/
     * @secure
     */
    habitatsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/habitats/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  listAnimals = {
    /**
     * @description Get a list of requests. Optionally filter by date and status.
     *
     * @tags list-animals
     * @name ListAnimalsList
     * @request GET:/list-animals/
     * @secure
     */
    listAnimalsList: (
      query?: {
        /**
         * Filter requests after a specific date
         * @format date
         */
        date?: string;
        /** Filter requests by status */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Animal[], any>({
        path: `/list-animals/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Аунтификация пользователя с логином и паролем. Возвращает файл cookie сеанса в случае успеха.
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: AuthToken, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  logout = {
    /**
     * @description Выход аунтифицированного пользователя. Удаление сессии.
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  moderateAnimal = {
    /**
     * @description Approve or decline a request (for moderators).
     *
     * @tags moderate-animal
     * @name ModerateAnimalUpdate
     * @request PUT:/moderate-animal/{id}/
     * @secure
     */
    moderateAnimalUpdate: (id: string, data: AcceptAnimal, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/moderate-animal/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a request (for moderators).
     *
     * @tags moderate-animal
     * @name ModerateAnimalDelete
     * @request DELETE:/moderate-animal/{id}/
     * @secure
     */
    moderateAnimalDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/moderate-animal/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * @description Обновление профиля аунтифицированного пользователя
     *
     * @tags profile
     * @name ProfileUpdate
     * @request PUT:/profile/
     * @secure
     */
    profileUpdate: (data: UserUpdate, params: RequestParams = {}) =>
      this.request<UserUpdate, void>({
        path: `/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * @description Регистрация нового пользователя.
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/register/
     * @secure
     */
    registerCreate: (data: UserRegistration, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
