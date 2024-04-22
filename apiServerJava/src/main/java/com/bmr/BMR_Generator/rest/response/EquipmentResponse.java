package com.bmr.BMR_Generator.rest.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class EquipmentResponse {
        @NonNull
        private Integer status;
        @NonNull
        private String message;
        @NonNull
        private Date timeStamp;
}
