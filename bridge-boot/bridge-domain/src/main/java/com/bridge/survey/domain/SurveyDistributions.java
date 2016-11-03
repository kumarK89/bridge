package com.bridge.survey.domain;

import java.sql.Date;

public class SurveyDistributions {

    private Integer srvyDstrbtnId;
    private String srvyDstrbtnNm;
    private Date dstrbtnClsAt;

    public Integer getSrvyDstrbtnId() {
        return srvyDstrbtnId;
    }

    public void setSrvyDstrbtnId(Integer srvyDstrbtnId) {
        this.srvyDstrbtnId = srvyDstrbtnId;
    }

    public String getSrvyDstrbtnNm() {
        return srvyDstrbtnNm;
    }

    public void setSrvyDstrbtnNm(String srvyDstrbtnNm) {
        this.srvyDstrbtnNm = srvyDstrbtnNm;
    }

    public Date getDstrbtnClsAt() {
        return dstrbtnClsAt;
    }

    public void setDstrbtnClsAt(Date dstrbtnClsAt) {
        this.dstrbtnClsAt = dstrbtnClsAt;
    }
}
